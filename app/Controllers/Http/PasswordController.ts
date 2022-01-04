import Encryption from "@ioc:Adonis/Core/Encryption";
import { RouteHandler } from "@ioc:Adonis/Core/Route";
import Credential from "App/Models/Credential";

export default class PasswordController {
  public index: RouteHandler = async ({ request }) => {
    const credential = await Credential.findOrFail(request.param('credential_id'))
    const decrypted = Encryption.decrypt(credential.password)

    return { decrypted };
  }
}
