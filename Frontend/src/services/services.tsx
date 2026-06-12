import { HomeService_GetData } from "./HomeService";
import { LoginService_Login } from "./LoginService";
import { MessagesService } from "./MessagesService";
import { UtilsService } from "./UtilsService";
import { TimetableService } from "./TimetableService";

export const services = {
    LoginService: LoginService_Login,
    HomeService: HomeService_GetData,
    MessagesService: MessagesService,
    UtilsService: UtilsService,
    TimetableService: TimetableService,
}