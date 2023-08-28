module.exports = {
    roots: ["<rootDir>/src"],
    collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
    coverageDirectory: "coverage",
    testEnvironment: "node",
    transform: {
      ".+\\.ts$": "ts-jest",
    },
    moduleNameMapper: { //Configuração atrelada ao tsconfig na parte de paths e baseUrl para permitir que as importações dentro de várias pastas possam ser feitas com a utilização de um @.
      "@/(.*)": "<rootDir>/src/$1"
    }
  }