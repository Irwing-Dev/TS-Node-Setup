import Person from ".";

it("MyName", () => {
    const person = new Person();

    expect(person.myName()).toBe("Irwing-Dev");
});
