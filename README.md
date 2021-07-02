# ETC JupyterLab Cell Properties

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/educational-technology-collective/etc_jupyterlab_cell_properties/main?urlpath=lab)

## Description 

This extension allows for CSS styling to be added to cell metadata.  The specified styling will style the respective cell.

## Usage

In order to add styling to a cell:  Click on a cell in a Notebook.  Open the Property Inspector in the Right Panel.  Add a property to the Cell Metadata object named `@educational-technology-collective/etc_jupyterlab_cell_properties:plugin` with a value that contains a property named `style`.  Assign an object to the `style` property that contains [JavaScript CSS Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference).  The CSS styling will be applied to the respective cell.

### Example

```json
{
    "@educational-technology-collective/etc_jupyterlab_cell_properties:plugin": {
        "style": {
            "background": "#FFCB05",
            "border": "solid #00274B 10px"
        },
        "tags": []
    },
    "tags": []
}
```

## Requirements

* JupyterLab >= 3.0

## Install

To install the extension:

Install the Python build package (https://pypi.org/project/build/).

```bash
pip install build
```

Clone to repository.

```bash
git clone https://github.com/educational-technology-collective/etc_jupyterlab_cell_properties.git
```

or,

```bash
git clone git@github.com:educational-technology-collective/etc_jupyterlab_cell_properties.git
```

Change the directory into the repository.

```bash
cd etc_jupyterlab_cell_properties
```

**The following instructions assume that your current working directory is the base directory of the repository.**

Next build the extension according to the instructions given in the [documentation](https://jupyterlab.readthedocs.io/en/stable/extension/extension_tutorial.html#packaging-your-extension).  The instructions are summarized below:

Create a wheel (.whl) package in the `dist` directory.

```bash
python -m build
```

Install the wheel package; this will install the extension.

```bash
pip install ./dist/etc_jupyterlab_cell_properties-*-py3-none-any.whl
```

Start Jupyter Lab.

```bash
jupyter lab
```
## Uninstall

To remove the extension, execute:

```bash
pip uninstall etc_jupyterlab_cell_properties
```

## Troubleshoot

If you are seeing the frontend extension, but it is not working, check
that the server extension is enabled:

```bash
jupyter server extension list
```

If the server extension is installed and enabled, but you are not seeing
the frontend extension, check the frontend extension is installed:

```bash
jupyter labextension list
```

## Usage




## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the etc_jupyterlab_cell_properties directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Server extension must be manually installed in develop mode
jupyter server extension enable etc_jupyterlab_cell_properties
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
# Server extension must be manually disabled in develop mode
jupyter server extension disable etc_jupyterlab_cell_properties
pip uninstall etc_jupyterlab_cell_properties
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `@educational-technology-collective/etc_jupyterlab_cell_properties` within that folder.
