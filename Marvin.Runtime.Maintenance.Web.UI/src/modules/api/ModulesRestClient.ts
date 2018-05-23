import RestClientBase from "../../common/api/RestClientBase";
import Config from "../models/Config";
import { ModuleServerModuleState } from "../models/ModuleServerModuleState";
import NotificationModel from "../models/NotificationModel";
import ServerModuleModel from "../models/ServerModuleModel";
import SaveConfigRequest from "./requests/SaveConfigRequest";

export default class ModulesRestClient extends RestClientBase {
    public modules(): Promise<ServerModuleModel[]> {
        return this.get<ServerModuleModel[]>("/ModuleMaintenance/modules", []);
    }

    public healthState(moduleName: string): Promise<ModuleServerModuleState> {
        return this.get<ModuleServerModuleState>("/ModuleMaintenance/modules/" + moduleName + "/healthstate", ModuleServerModuleState.Failure);
    }

    public notifications(moduleName: string): Promise<NotificationModel[]> {
        return this.get<NotificationModel[]>("/ModuleMaintenance/modules/" + moduleName + "/notifications", []);
    }

    public startModule(moduleName: string): Promise<Response> {
        return this.postNoBody<Response>("/ModuleMaintenance/modules/" + moduleName + "/start", new Response());
    }

    public stopModule(moduleName: string): Promise<Response> {
        return this.postNoBody<Response>("/ModuleMaintenance/modules/" + moduleName + "/stop", new Response());
    }

    public reincarnateModule(moduleName: string): Promise<Response> {
        return this.postNoBody<Response>("/ModuleMaintenance/modules/" + moduleName + "/reincarnate", new Response());
    }

    public confirmModuleWarning(moduleName: string): Promise<Response> {
        return this.postNoBody<Response>("/ModuleMaintenance/modules/" + moduleName + "/confirm", new Response());
    }

    public updateModule(request: ServerModuleModel): Promise<Response> {
        return this.post<ServerModuleModel, Response>("/ModuleMaintenance/modules/" + request.Name, request, new Response());
    }

    public moduleConfig(moduleName: string): Promise<Config> {
        return this.get<Config>("/ModuleMaintenance/modules/" + moduleName + "/config", new Config());
    }

    public saveModuleConfig(moduleName: string, request: SaveConfigRequest): Promise<Response> {
        return this.post<SaveConfigRequest, Response>("/ModuleMaintenance/modules/" + moduleName + "/config", request, new Response(), this.entryReplacer);
    }

    private entryReplacer(key: string, value: any) {
        if (key == "Parent") { return undefined; }
        return value;
    }
}
