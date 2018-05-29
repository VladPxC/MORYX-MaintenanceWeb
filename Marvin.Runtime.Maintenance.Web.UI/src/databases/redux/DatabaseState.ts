require("../../types/constants");
import { ActionType } from "../../common/redux/Types";
import DatabasesRestClient from "../api/DatabasesRestClient";
import DataModel from "../models/DataModel";
import { UPDATE_DATABASE_CONFIG, UPDATE_DATABASE_CONFIGS } from "./DatabaseActions";

export interface DatabaseState {
    RestClient: DatabasesRestClient;
    DatabaseConfigs: DataModel[];
}

export const initialDatabaseState: DatabaseState = {
    DatabaseConfigs: [],
    RestClient: new DatabasesRestClient(window.location.hostname, parseInt(RESTSERVER_PORT, 10)),
};

export function getDatabaseReducer(state: DatabaseState = initialDatabaseState, action: ActionType<{}>): DatabaseState {
  switch (action.type) {
    case UPDATE_DATABASE_CONFIGS:
    {
        return { ...state, DatabaseConfigs: action.payload as DataModel[] };
    }
    case UPDATE_DATABASE_CONFIG:
    {
        const databaseConfig = action.payload as DataModel;

        return {
            ...state,
            DatabaseConfigs: state.DatabaseConfigs.map(
                (config, i) => config.TargetModel === databaseConfig.TargetModel ? {...databaseConfig}
                                        : config,
            ),
         };
    }
  }
  return state;
}
