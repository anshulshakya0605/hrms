import type {Request, RequestHandler, Response } from "express";
import { AuthService } from "./auth.service.js";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../shared/constant/index.js";
import type { LoginInput, RegisterInput } from "./auth.types.js";


export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register: RequestHandler = async (
    request: Request<unknown, unknown, RegisterInput>,
    response: Response,
  ): Promise<void> => {
    const data = await this.authService.register(
      request.body,
    );

    response.status(HTTP_STATUS.CREATE).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_REGISTERED_SUCCESSFULLY,
      data,
    });
  };

  login: RequestHandler = async(
    request: Request<unknown, unknown, LoginInput>,
    response: Response
  ): Promise<void> => {

    const data = await this.authService.login(request.body);
    response.status(HTTP_STATUS.OK).json({
        success:true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
        data
    })
  }

  me: RequestHandler = async (
    request,
    response,
  ): Promise<void> => {
    const data = await this.authService.getCurrentUser(
      request.user!.userId
    );

    response.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.USER_FETCHED_SUCCESSFULLY,
      data,
    });
}
  
}