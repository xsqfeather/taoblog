import { controller, get, options } from "hapi-decorators";
import { Inject, Service } from "typedi";
import { MController } from "../../lib";
import { UserService } from "services";
import { User } from "models";
import { Request } from "@hapi/hapi";
import Joi from "joi";

@Service()
@controller("/api/users")
export class UserApiController extends MController {
  @Inject(() => UserService)
  userService!: UserService;

  @get("/")
  @options({
    tags: ["api", "查询用户列表"],
    description: "测试",
    notes: "测试",
  })
  list(): any {
    return [];
  }

  @get("/{id}")
  @options({
    tags: ["api", "查询用户详情"],
    description: "测试",
    notes: "测试",
    validate: {
      params: Joi.object({
        id: Joi.string().required().description("用户ID"),
      }),
    },
  })
  detail(req: Request): Promise<User> {
    return this.userService.getUserById(req.params.id);
  }
}
