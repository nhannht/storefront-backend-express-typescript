import { User, UserList } from "../../models/user";

const list = new UserList()

describe ('User Model', () => {
    it('should have an index method', () => {
        expect(list.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(list.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(list.create).toBeDefined();
    });

    it('create method should add a user', async () => {
        const u: User = {
            first_name: "Juno",
            last_name: "Song",
            password: "ahihi123"
        }

        const result = await list.create(u)

        expect(result).toEqual({
            id: result.id,
            first_name: "Juno",
            last_name: "Song",
            password: result.password
        });
    })

    it('index method should show all users', async () => {
        const result = await list.index()
        expect(result.length).toBeGreaterThan(0)
    })

    // it('show method should return the correct user', async () => {
    //     const result = await list.show("3")
    //     expect(result).toEqual({
    //         id: 3,
    //         first_name: 'Juno',
    //         last_name: 'Song',
    //         password: result.password
    //     });
    // })

})
