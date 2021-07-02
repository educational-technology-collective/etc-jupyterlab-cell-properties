import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

import {
  INotebookTracker,
  NotebookPanel,
  INotebookModel,
  Notebook,
  NotebookActions
} from "@jupyterlab/notebook";

import {
  ISettingRegistry
} from "@jupyterlab/settingregistry";

import {
  IDocumentManager
} from "@jupyterlab/docmanager";

import {
  Cell,
  CodeCell,
  ICellModel
} from "@jupyterlab/cells";

import { IObservableMap, IObservableJSON } from '@jupyterlab/observables';

import {
  PartialJSONValue, ReadonlyPartialJSONValue
} from '@lumino/coreutils';

const PLUGIN_ID = "@educational-technology-collective/etc_jupyterlab_cell_properties:plugin"

/**
 * Initialization data for the @educational-technology-collective/etc_jupyterlab_cell_properties extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  optional: [ISettingRegistry],
  requires: [
    INotebookTracker,
    IDocumentManager
  ],
  activate: (
    app: JupyterFrontEnd,
    notebookTracker: INotebookTracker,
    documentManager: IDocumentManager,
    settingRegistry: ISettingRegistry | null
  ) => {
    console.log('JupyterLab extension @educational-technology-collective/etc_jupyterlab_cell_properties is activated!');

    // if (settingRegistry) {
    //   settingRegistry
    //     .load(plugin.id)
    //     .then(settings => {
    //       console.log('@educational-technology-collective/etc_jupyterlab_cell_properties settings loaded:', settings.composite);
    //     })
    //     .catch(reason => {    notebookTracker.widgetAdded.connect(async (sender: INotebookTracker, notebookPanel: NotebookPanel) => {

    notebookTracker.widgetAdded.connect(async (sender: INotebookTracker, notebookPanel: NotebookPanel) => {

      await notebookPanel.revealed;

      notebookPanel.content.widgets.forEach((cell: Cell<ICellModel>) => {

        cell.model.metadata.changed.connect((
          sender: IObservableJSON,
          args: IObservableMap.IChangedArgs<ReadonlyPartialJSONValue | undefined>
        ) => {

          if (args.key === PLUGIN_ID) {

            let style = (args.newValue as any)["style"];

            Object.assign(cell.node.style, style);

          }
        });
      });
    });

    //       console.error('Failed to load settings for @educational-technology-collective/etc_jupyterlab_cell_properties.', reason);
    //     });
    // }

    // requestAPI<any>('get_example')
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(reason => {
    //     console.error(
    //       `The etc_jupyterlab_cell_properties server extension appears to be missing.\n${reason}`
    //     );
    //   });


  }
};

export default plugin;
