import { z } from "zod";
import { sign_up_validations, sign_in_validations } from "./validations";

type sign_up_data_type = z.infer<typeof sign_up_validations>;
type sign_in_data_type = z.infer<typeof sign_in_validations>;
export type { sign_up_data_type, sign_in_data_type };
