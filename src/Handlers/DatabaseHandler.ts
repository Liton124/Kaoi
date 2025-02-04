import { IDBModels } from "../typings";
import UserModel from "../lib/Mongo/Models/User";
import GroupModel from "../lib/Mongo/Models/Group";
import SessionModel from "../lib/Mongo/Models/Session";
import DisabledCommandsModel from "../lib/Mongo/Models/DisabledCommands";
import IFeatureModel from "../lib/Mongo/Models/Features";
import cdModel from "../lib/Mongo/Models/Countdown";

export default class DatabaseHandler implements IDBModels {
    user = UserModel;
    group = GroupModel;
    session = SessionModel;
    disabledcommands = DisabledCommandsModel;
    feature = IFeatureModel;
    cd = cdModel;
}
