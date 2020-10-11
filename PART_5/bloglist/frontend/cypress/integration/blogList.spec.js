describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Robert Orazu",
      username: "tito",
      password: "505050",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("contains Login form", function () {
    cy.contains("login");
  });
  it("succeeds with correct credentials", function () {
    cy.get("#username").type("tito");
    cy.get("#password").type("505050");
    cy.get("#login-button").click();

    cy.contains("logged-in");
  });

  it("fails with wrong credentials", function () {
    cy.get("#username").type("tito");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".notification").should("contain", "Wrong Username or password");
    cy.get(".notification").should("have.css", "color", "rgb(236, 41, 6)");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "tito", password: "505050" });
      cy.get("#newBlog").click();
    });

    it("A blog can be created", function () {
      cy.get("#title").type("The Real Blog");
      cy.get("#author").type("Mister Stranger");
      cy.get("#url").type("https://theunknownland.php");

      cy.get("#save").click();
      cy.contains("The Real Blog");
    });
    describe("When a blog has been created and expanded", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "You'll never walk alone",
          author: "Tak Minamino",
          url: "https://another.com",
        });
        cy.get("#expand").click();
      });
      it("A blog can be liked", function () {
        cy.get("#like").click();
        cy.contains("1");
      });
      it("a blog can be deleted by the creator", function () {
        cy.get("#delete").click();
        cy.get("#blogs").should("not.contain", "You'll never walk alone");
      });
    });
  });
});
