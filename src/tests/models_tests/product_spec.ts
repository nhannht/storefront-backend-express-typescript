import { Product, Inventory } from "../../models/product";

const inventory = new Inventory()

describe ('Product Model', () => {
    it('should have an index method', () => {
        expect(inventory.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(inventory.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(inventory.create).toBeDefined();
    });

    it('should have a productsByCat method', () => {
        expect(inventory.productsByCat).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await inventory.create({
            name: "Monitor",
            price: 54,
            category: "Desktop"
        })
        expect(result).toEqual({
            id: result.id,
            name: "Monitor",
            price: 54,
            category: "Desktop"
        });
    })

    it('show method should return the correct product', async () => {
        const result = await inventory.show("2")
        expect(result).toEqual({
            id: 2,
            name: "Monitor",
            price: 54,
            category: "Desktop"
        });
    })

    it('index method should return a list of products', async () => {
        const result = await inventory.index()
        expect(result.length).toBeGreaterThan(0);
    })

    it('productsByCat method should return a list of products under category "Desktop"', async () => {
        const result = await inventory.productsByCat("Desktop")
        expect(result.length).toBeGreaterThan(0);
    })

})