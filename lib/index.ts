/// <reference types="nextcloud-typings" />

type OCP16to17 = Nextcloud.v16.OCP | Nextcloud.v17.OCP
declare var OCP: OCP16to17;

export function loadState<T>(appId: string, key: string): T {
    return OCP.InitialState.loadState<T>(appId, key)
}
