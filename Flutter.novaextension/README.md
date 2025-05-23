> [!IMPORTANT]
> This repository has been archived in favor of [codeberg.org/kramo/nova-flutter](https://codeberg.org/kramo/nova-flutter).

Provides support for running and automatically hot reloading/restarting your Flutter apps.

![](https://raw.githubusercontent.com/kra-mo/nova-flutter/refs/heads/main/screenshot.png)

## Requirements

The extension requires the Flutter SDK to be installed on your Mac.

> Documentation on how to install it is available [here](https://docs.flutter.dev/get-started/install/macos).

It is also highly recommended to use the extension alongside [Dart](https://extensions.panic.com/extensions/sciencefidelity/sciencefidelity.dart/),
which provides support for syntax highlighting, a language server, as well as formatting.

## Usage

To run your application, simply open a project and click the **Run** ▶️ button in the project toolbar.

By default, a hot reload is automatically triggered on save
and you can hot restart by selecting the **Extensions → Flutter → Hot Restart** menu item.

### Configuration

To configure global preferences, open **Extensions → Extension Library...** then select Flutter's **Preferences** tab.

Available options:

- Hot Reload When Saving
- Target Device

You can also configure preferences on a per-project basis in **Project → Project Settings...**

Available options:

- Target Device
