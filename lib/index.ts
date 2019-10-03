export function loadState<T>(app, key): T {
    const elem = <HTMLInputElement>document.querySelector(`#initial-state-${app}-${key}`)
    if (elem === null) {
        const msg = `Could not find initial state ${key} of ${app}`
        console.error(msg)
        throw new Error(msg)
    }

    try {
        return JSON.parse(atob(elem.value))
    } catch (e) {
        const msg = `Could not parse initial state ${key} of ${app}`
        console.error(msg)
        throw new Error(msg)
    }
}
