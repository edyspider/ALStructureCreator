# Change Log

All notable changes to the **AL Structure Creator** extension will be documented in this file.

----

## 2.0.0

### Breaking

- The `pageExt` folder key in `FolderStructure` is now `pageext`, like the other folder keys. Rename it if you customised it.
- Requires VS Code 1.95 or later.

### Fixed

- Folders for extension objects (`enumext`, `pageext`, `permissionsetext`, `reportext`, `tableext`) are created and found again.
- **Reorganize Files** recognises `reportextension` and `permissionsetextension` objects and the longest matching identifier wins (`PageExt` before `Page`).
- **Reorganize Files** no longer stops when one file fails, skips files that already exist in the target folder and reports how many files were moved.
- **Create Folder Structure** accepts folder keys you added to `FolderStructure`, and shows an error when a built-in folder is missing from that setting.
- Cancelling the folder input no longer shows a success message.
- Keyboard shortcuts `Alt+E Alt+C` and `Alt+E Alt+R` now work.
- Commands show a clear message when no folder or workspace is open.
- The `FolderStructure` setting is validated in the Settings editor.
- The README now lists the right command names and shortcuts.

### Changed

- File reorganization is driven by one table of object types instead of one block of code per type.
- Upgraded to TypeScript 6 and replaced TSLint with ESLint.
- Added unit and integration tests and a GitHub Actions workflow that builds, tests and packages the extension.
- The published package no longer includes source files, tests or `node_modules`.

----

## 1.7.0

### Added

- Add object folders extension (pageext, tableext, ..) as part of source folder setup and not as property folder.
- Update object files reorganization to include object extension folders.

----

## 0.5.0

### Added

- Fixed compile issues.

----

## 0.4.0

### Added

- Allow file reorganization by reading the object type inside al files.

----

## 0.3.9

### Added

- Minor fixes

### Removed

- Remove test folder from the structure

----

## 0.3.8

### Added

- Allow to create object customization folder (e.g.: PageCust).
- Allow to create object extension folder (e.g.: TableExt).

----

## 0.3.6

### Removed

- Remove Permission folder from the ALStructure settings.

----

## 0.3.5

### Added

- Minor fixes.

----

## 0.3.4

### Removed

- Remove RequestPage folder from the ALStructure settings.

----

## 0.3.3

### Added

- Minor fixes.

----

## 0.3.0

### Added

- New configuration in json format that allows to customize the default al folder structure.
- Add general action to create specific folder.
- Add configurations to identify type of object/files.

### Removed

- Discontinued configurations because of the newly added configuration.
- Removed actions regarding creating specific object folders.

----

## 0.2.0

### Added

- New configuration and that allows to create a subfolder inside the report folder for all the layout files (RDL).

----

## 0.1.0

### Added

- New command to move/**reorganize** application objects to the corresponding application folders.
- New configurations to be used in the new command.
- New folder validations.

### Removed

- Configuration `ProjectFolderOption`.

----

## 0.0.2

### Added

- New command to create an application object folder individually.

----

## 0.0.1

- Initial release.
