import {User} from "../models/usersModel.js";
import {Skill} from "../models/skillsModel.js";
import bcrypt from 'bcryptjs';

const user = {
    name: 'Test Admin',
    email: 'test.email@gmail.com',
    username: 'test123',
    password: 'test_password123',
    profile: 'board',
};

const skills = [ 'Javascript', 'PHP', 'Go', ' C#', 'Express JS', 'Laravel', 'Symfony', 'Go Gin', 'Python',
                            'Django', 'C#', 'Asp.net', 'MySQL', 'Postgres', 'MongoDB' ];

export const seedData = async () => {
    try {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
            user.password = await bcrypt.hash(user.password, 10);
            await User.create(user);
        }

        const existingSkills = await Skill.find();
        if (existingSkills.length === 0) {
            const skillsData = skills.map(name => ({ name }));
            await Skill.insertMany(skillsData);
        }
    } catch (error) {
        console.error('Error seeding data:', error.toString());
    }
}
