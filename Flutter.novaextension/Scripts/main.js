let pidPath = `${nova.fs.tempdir}/${nova.crypto.randomUUID()}`;

function hotReload(restart = false) {
  let pid;

  try {
    if ((pid = nova.fs.open(pidPath).read()) === null) return;
  } catch {
    return;
  }

  new Process("/usr/bin/env", {
    args: ["kill", restart ? "-SIGUSR2" : "-SIGUSR1", pid],
  }).start();
}

nova.commands.register("hotReload", (editor) => hotReload());
nova.commands.register("hotRestart", (editor) => hotReload(true));

class TaskProvider {
  constructor() {}

  provideTasks() {
    let task = new Task("Flutter Run");

    task.setAction(
      Task.Run,
      new TaskProcessAction("/usr/bin/env", {
        args: [
          "flutter",
          "run",
          "-d",
          nova.workspace.config.get("flutter.device") ||
            nova.config.get("flutter.device") ||
            "macos",
          "--pid-file",
          pidPath,
        ],
      })
    );

    task.setAction(
      Task.Clean,
      new TaskProcessAction("/usr/bin/env", {
        args: ["flutter", "clean"],
      })
    );

    return [task];
  }
}

function registerTaskProvider() {
  nova.assistants.registerTaskAssistant(new TaskProvider(), {
    identifier: "flutter",
    name: "Flutter",
  });
}

registerTaskProvider();
nova.config.onDidChange("flutter.device", registerTaskProvider);
nova.workspace.config.onDidChange("flutter.device", registerTaskProvider);

exports.activate = () =>
  nova.workspace.onDidAddTextEditor((editor) => {
    if (editor.document.syntax !== "dart") return;
    editor.onDidSave(function (editor) {
      if (nova.config.get("flutter.hot-reload")) hotReload();
    });
  });

exports.deactivate = () => nova.fs.remove(pidPath);
