export const handlerDocumentOutsideClick = (e: any, refItem: any, callFunction: (variable: boolean) => void, value: boolean) => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(refItem.current)) {
        callFunction(value);
    }
};