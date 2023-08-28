import Developer from "@/one/two/three/three";

class Person {
    myName(): string {
        return "Irwing-Dev";
    }
}

// O "@" se deve à uma configuração feita no tsconfig.json que impede que seja preciso dar vários ../../../ para achar um arquivo.

console.log(new Developer().myFunction());

export default Person;
