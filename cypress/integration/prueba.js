
const URL  = "192.168.0.10:8080"
const numeroCuadros = 12

context("memotest", () => {

    before(() => {
        cy.visit(URL)
    })

    it("se asegura un tablero con cuadros",() =>{
        cy.get("#tablero").find(".cuadro").should("have.length", numeroCuadros)
    })

    it("se asegura que los cuadros sean aleatorios", () =>{
        cy.get(".cuadro").then((cuadros) => {
            let clasesOriginales = []
            cuadros.each(function(i, cuadro){
                clasesOriginales.push(cuadro.className)
            })
        
            cy.visit(URL)
        
            let nuevasClases = []
            cy.get(".cuadro").then(nuevosCuadros => {
                nuevosCuadros.each(function(i, cuadro){
                    nuevasClases.push(cuadro.className)
                })
            })
        
            cy.wrap(clasesOriginales).should("not.deep.equal", nuevasClases)

        })
    })

    describe("hace el memotest", () => {
        let mapaDePares, listaDePares
        it("elije una combinacion incorrecta", () => {
            cy.get(".cuadro").then(cuadros => {
                mapaDePares = obtenerParesCuadros(cuadros)
                listaDePares = Object.values(mapaDePares)
                console.log(listaDePares)
                cy.get(listaDePares[0][0]).click()
                cy.get(listaDePares[1][0]).click()

                cy.get(".cuadro").should("have.length", numeroCuadros)
            })
        })
    
        it("resuelve el juego", () => {
            cy.get(".cuadro").should("have.length", numeroCuadros)

            listaDePares.forEach((par) => {
                cy.get(par[0]).click()
                cy.get(par[1]).click()
            })
            
            cy.get(".cuadro").should("have.length", 0)
        
        
        })
        
    
    })
})


function obtenerParesCuadros(cuadros){
    const pares = {}

    cuadros.each((i, cuadro) => {
        //primero es cuadro h-100 rojo, despues amarillo, etc
        // reemplaza cuadro h-100 con un espacio vacio - claseColor = amarillo(x ej)
        const claseColor = cuadro.className.replace("cuadro h-100 ", "")


        if(pares[claseColor]){
            pares[claseColor].push(cuadro)
        } else{
            pares[claseColor] = [cuadro]
        }
    })

    console.log(pares)
    return pares

}