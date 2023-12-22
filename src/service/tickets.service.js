import { TicketsDAO } from "../dao/dbManagers/tickets.manager.js";
import { TicketDTO } from "../DTO/tickets.dto.js";

const ticketsDAO = new TicketsDAO();

export class TicketsService {
    constructor (){
    }

    async getAll() {
        return await ticketsDAO.getAll();
    }

    async getId(id) {
        return await ticketsDAO.getId(id);
    }

    async create(obj) {
        const ticket = new TicketDTO(obj);
        return await ticketsDAO.create(ticket);
    }

    async update(id, obj) {
        const ticket = new TicketDTO(obj);
        return await ticketsDAO.update(id, ticket);
    }

    async delete (id) {
        return await ticketsDAO.delete(id);
    }
}