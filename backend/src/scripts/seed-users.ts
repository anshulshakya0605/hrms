import bcrypt from "bcrypt"

import { UserModel } from "../modules/auth/auth.model.js";
import { ROLES } from "../shared/constant/roles.constants.js";
import { connectDatabase } from "../config/database.js";


const seedUser = async (
    email: string,
    firstName: string,
    lastName: string,
    role: (typeof ROLES)[keyof typeof ROLES]
): Promise<void> => {

    const password = "Password@123";

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.role = role;

        existingUser.password = password;

        await existingUser.save();

        console.log(`Update ${role}: ${email}`)

        return
    }

    // const hashedPassword = await bcrypt.hash(password, 12);

    UserModel.create({
        firstName,
        lastName,
        email,
        password,
        role
    })

    console.log(`Created ${role}: ${email}`);

};

const seedUsers = async (): Promise<void> => {
    try {

        await connectDatabase();

        await seedUser(
            "admin@gmail.com",
            "System",
            "Admin",
            ROLES.ADMIN
        );

        await seedUser(
            "manager@gmail.com",
            "HR",
            "Manager",
            ROLES.MANAGER
        );

        console.log("");
        console.log("================================");
        console.log("Seed users completed successfully");
        console.log("================================");
        console.log("");
        console.log("ADMIN");
        console.log("Email: admin@hrms.com");
        console.log("Password: Password@123");
        console.log("");
        console.log("MANAGER");
        console.log("Email: manager@hrms.com");
        console.log("Password: Password@123");
        console.log("");

    } catch (error) {
        console.error("Failed to seed users", error)
        process.exitCode = 1;
    }
}

await seedUsers();