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

import { Signal } from "@lumino/signaling";

import {
  IObservableList,
  IObservableUndoableList,
  IObservableString
} from "@jupyterlab/observables";

class CellWrapper {

  private _cell: Cell<ICellModel>;

  constructor({ cell }: { cell: Cell<ICellModel> }) {
    this.dispose = this.dispose.bind(this);
    this.onCellMetadataChanged = this.onCellMetadataChanged.bind(this);
    this.update = this.update.bind(this);
    this._cell = cell;

    cell.model.metadata.changed.connect(this.onCellMetadataChanged, this);
    cell.disposed.connect(this.dispose, this);

    setTimeout(this.update, 0);
  }

  dispose() {
    Signal.disconnectAll(this);
  }

  update() {
    if (this._cell?.model?.metadata.has(PLUGIN_ID)) {

      let metadata = this._cell.model.metadata.get(PLUGIN_ID) as { style?: any };

      if (metadata["style"] !== null && typeof metadata["style"] == "object") {

        Object.assign(this._cell.node.style, metadata["style"]);
      }
    }
  }

  onCellMetadataChanged(sender: IObservableJSON, args: IObservableMap.IChangedArgs<ReadonlyPartialJSONValue | undefined>) {
    if (args.key == PLUGIN_ID) {
      let style = (args.newValue as { style?: any })["style"];

      if (style !== null && typeof style == "object") {
        Object.assign(this._cell.node.style, style);
      }
    }
  }
}

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
    
    notebookTracker.widgetAdded.connect(async (sender: INotebookTracker, notebookPanel: NotebookPanel) => {

      await notebookPanel.revealed;

      notebookPanel.content.widgets.forEach((cell: Cell<ICellModel>) => {

        new CellWrapper({ cell });
      });

      notebookPanel.content.model?.cells.changed.connect(
        (
          sender: IObservableUndoableList<ICellModel>,
          args: IObservableList.IChangedArgs<ICellModel>
        ) => {

          if (args.type == "add" || args.type == "set") {

            args.newValues.forEach((model: ICellModel) => {

              let cell = notebookPanel.content.widgets.find((cell: Cell<ICellModel>) => cell.model == model);

              if (cell) {

                new CellWrapper({ cell });
              }
            });
          }
          else {

          }
        });
    });
  }
};

export default plugin;
