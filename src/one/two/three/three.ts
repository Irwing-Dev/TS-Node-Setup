import Person from "@/index"; // O "@" se deve à uma configuração feita no tsconfig.json que impede que seja preciso dar vários ../../../ para achar um arquivo.

console.log(new Person().myName());
