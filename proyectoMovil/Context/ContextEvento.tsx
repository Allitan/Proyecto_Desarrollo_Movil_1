import { createContext } from "react";
import { Evento } from "../Modelos/Eventos";

export const contextEvento = createContext({
    listaEventos: [] as Evento[],
    agregarEvento: (evento: Evento) => {},
    listarEventos: () => {},
    eliminarEvento: (id: number) => {}
})