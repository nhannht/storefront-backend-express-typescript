import app from "../server"
import supertest from "supertest"

describe("Test Endpoints", () => {

  describe("Test user-related endpoints", () => {
    
    describe("Endpoints /user/create", () => {
      it("should response ok code 200 when request body {firstName: 'Bella', lastName: 'Carotts', password: 'passWord9'} is provided", (done) => {
        supertest(app)
        .post("/user/create")
        .set({
          firstName: "Bella",
          lastName: "Carotts",
          password: "passWord9"
        })
        .expect(200,done)
      });
    });
    
    describe("Test user-related endpoints which need authorization", () => {
      var tokenForTesting: string = ''

      beforeAll(done => {
        supertest(app)
        .post("/user/create")
        .set({
          firstName: "Emma",
          lastName: "Pitts",
          password: "passWord1"
        })
        .end((err,res) => {
            tokenForTesting = JSON.parse(res.text)
            done()
        });
      })

      describe("Endpoints /authenticate", () => {
        
        it("should response error code 401 'Unauthorized' if no authorization is provided in request header", () => {
          supertest(app).get("/authenticate").expect(401);
        });
        
        it("should response ok code 200 when request body {firstName: 'Emma', password: 'passWord1'} is provided", (done) => {
          supertest(app)
          .get("/authenticate")
          .set('Authorization',`Bearer ${tokenForTesting}`)
          .set({
            firstName: "Emma",
            password: "passWord1"
          })
          .expect(200, done);
        });
      });
  
      describe("Endpoints /users", () => {
        it("should response error code 401 'Unauthorized' if no authorization is provided in request header", () => {
          supertest(app).get("/users").expect(401);
        });
        it("should response ok code 200 if authorization is provided in request header", (done) => {
          supertest(app).get("/users").set('Authorization',`Bearer ${tokenForTesting}`).expect(200, done);
        });
      });
  
      describe("Endpoints /user/:id", () => {
        it("should response error code 401 'Unauthorized' if no authorization is provided in request header", () => {
          supertest(app).get("/user/1").expect(401);
        });
        it("should response ok code 200 if authorization is provided in request header", (done) => {
          supertest(app).get("/user/1").set('Authorization',`Bearer ${tokenForTesting}`).expect(200, done);
        });
      });
    })
  })

  describe("Test product-related endpoints", () => {
    var tokenForTesting: string = ''

      beforeAll(done => {
        supertest(app)
        .post("/user/create")
        .set({
          firstName: "Emma",
          lastName: "Hermes",
          password: "passWord2"
        })
        .end((err,res) => {
            tokenForTesting = JSON.parse(res.text)
            done()
        });
      })

    describe("Endpoints /create", () => {
      it("should response error code 401 'Unauthorized' if no authorization is provided in request header", () => {
        supertest(app).post("/create").expect(401);
      });
      it("should response ok code 200 when request body {name: 'CPU', price: 500, category: 'Desktop'} is provided", (done) => {
        supertest(app)
        .post("/create")
        .set('Authorization',`Bearer ${tokenForTesting}`)
        .set({
          name: "CPU",
          price: 500,
          category: "Desktop"
        })
        .expect(200, done);
      });
  });

    describe("Test Endpoints /products", () => {
      it("should response error code 404 'Not Found' if endpoint is provided as '/productss' ", () => {
        supertest(app).get("/productss").expect(404);
      });
    });

    describe("Test Endpoints /product/:id", () => {
      it("should response ok code 200 if endpoint is provided as '/product/1'", (done) => {
        supertest(app).get("/product/1").expect(200, done);
      });
      describe("Test Endpoints /product/:id", () => {
        it("should response error 404 'Not Found' if unexisting id is provided", () => {
          supertest(app).get("/product/10").expect(404);
        });
      });
    });

    describe("Test Endpoints /products-by-category/:category", () => {
      it("should response ok code 200", (done) => {
        supertest(app).get("/products-by-category/Desktop").expect(200, done);
      });
    });
  })

  describe("Test order-related endpoints", () => {
    var tokenForTesting: string = ''

      beforeAll(done => {
        supertest(app)
        .post("/user/create")
        .set({
          firstName: "Harry",
          lastName: "Pitts",
          password: "passWord3"
        })
        .end((err,res) => {
            tokenForTesting = JSON.parse(res.text)
            done()
        });
      })

    describe("Endpoints /order/create", () => {
      it("should response error code 401 'Unauthorized' if no authorization is provided in request header", () => {
        supertest(app).post("/order/create").expect(401);
      });
      it("should response ok code 200 when request body {status: 'pending', userId: 1} is provided", () => {
        supertest(app)
        .post("/order/create")
        .set('Authorization',`Bearer ${tokenForTesting}`)
        .set({
          status: "pending",
          userId: 1
        })
        .expect(200);
      });
    });

    describe("Endpoints /order/add-product", () => {
      it("should response error code 401 'Unauthorized'if no authorization is provided in request header", () => {
        supertest(app).post("/order/add-product").expect(401);
      });
      it("should response ok code 200 when request body {quantity: 3, productId: 1, orderId: 1} is provided", (done) => {
        supertest(app)
        .post("/order/add-product")
        .set('Authorization',`Bearer ${tokenForTesting}`)
        .set({
          quantity: 3,
          productId: 1,
          orderId: 1
        })
        .expect(200, done);
      });
    });

    describe("Endpoints /order/user/:id", () => {
      it("should response error code 401 'Unauthorized'", () => {
        supertest(app).get("/order/user/1").expect(401);
      });
      it("should response ok code 200 if authorization is provided in request header", (done) => {
        supertest(app).get("/order/user/1").set('Authorization',`Bearer ${tokenForTesting}`).expect(200, done);
      });
    });

    describe("Test Endpoints /order/complete/user/:id", () => {
      it("should response error code 401 'Unauthorized'", () => {
        supertest(app).get("/order/complete/user/1").expect(401);
      });
      it("should response ok code 200 if authorization is provided in request header", (done) => {
        supertest(app).get("/order/complete/user/1").set('Authorization',`Bearer ${tokenForTesting}`).expect(200, done);
      });
    });

    describe("Endpoints /top-five-products", () => {
      it("should response ok code 200", () => {
        supertest(app).get("/top-five-products").expect(200);
      });
    });
  })

})