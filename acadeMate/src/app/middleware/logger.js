const loggerMiddleware = storeAPI => next => action => {
    if (!import.meta.env.DEV) return next(action);
    console.group(
        `%c Action: ${action.type}`,
        'color:#3A5BA0; font-weight:bold'
    );
    console.log('%c prev state', 'color:#9E9E9E', storeAPI.getState());
    console.log('%c action',     'color:#03A9F4', action);
    const result = next(action);
    console.log('%c next state', 'color:#4CAF50', storeAPI.getState());
    console.groupEnd();
    return result;
};

export default loggerMiddleware;
