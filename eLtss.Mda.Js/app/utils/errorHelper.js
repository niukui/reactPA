import ReactUpdates from "react-dom/lib/ReactUpdates";
import ReactDefaultBatchingStrategy
  from "react-dom/lib/ReactDefaultBatchingStrategy";
import toastr from "./toastr";

export function injectGlobalErrorProcessor(processor) {
  let isHandlingError = false;
  const ReactTryCatchBatchingStrategy = {
    // this is part of the BatchingStrategy API. simply pass along
    // what the default batching strategy would do.
    get isBatchingUpdates() {
      return ReactDefaultBatchingStrategy.isBatchingUpdates;
    },

    batchedUpdates(...args) {
      try {
        ReactDefaultBatchingStrategy.batchedUpdates(...args);
      } catch (e) {
        if (isHandlingError) {
          throw e;
        }
        isHandlingError = true;
        try {
          console.error(e);
          toastr.error(e);
          if (processor) {
            processor(e);
          }
        } finally {
          isHandlingError = false;
        }
      }
    }
  };

  ReactUpdates.injection.injectBatchingStrategy(ReactTryCatchBatchingStrategy);
}
