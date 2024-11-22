export function El({ 
    element,
    children,
    eventListener,
    dataset,
    restAttrs = {},
    className = "",
    ...rest
    }) {
    const elem = document.createElement(element);
    for (const attr in rest) {
    elem[attr] = rest[attr];
    }
    if (children) {
    for (let i = 0; i < children.length; i++) {
    elem.append(children[i]);
    }
    }
    if (eventListener) {
    eventListener.map((el) => elem.addEventListener(el.event, el.callback));
    }
    if (dataset) {
    for (const key in dataset) {
    elem.dataset[key] = dataset[key];
    }
    }
    for (const key in restAttrs) {
    elem.setAttribute(key, restAttrs[key]);
    }
    elem.setAttribute("class", className);
    return elem;
    }
    