// import { MigrationInterface, QueryRunner } from "typeorm";
// // import adminSeed from '../seeds/user.seed';
// // import { UserEntity } from "../entity/User";
// import getConnection from '../index'
// import User from "../../interfaces/user.interface";

// export class seedUsers1645343127032 implements MigrationInterface {

//     public async up(_: QueryRunner): Promise<any> {
//         const userRepository = getConnection().getRepository(UserEntity);
//         const user: User = userRepository.create(adminSeed);
//         await userRepository.save(user);

//     }

//     // eslint-disable-next-line @typescript-eslint/no-empty-function
//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }
// }
