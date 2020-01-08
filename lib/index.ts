/**
 * @param app app ID, e.g. "mail"
 * @param key name of the property
 * @throws if the key can't be found
 */
export function loadState<T>(app: string, key: string): T {
    const elem = <HTMLInputElement>document.querySelector(`#initial-state-${app}-${key}`)
    if (elem === null) {
        throw new Error(`Could not find initial state ${key} of ${app}`)
    }

    try {
        return JSON.parse(atob(elem.value))
    } catch (e) {
       throw new Error(`Could not parse initial state ${key} of ${app}`)
    }
}
