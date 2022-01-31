
const apiClient = {
    get: async () =>
        await Promise.resolve({
            data: [{ text: "Write code", done: false, id: "123" }]
        })

};
//  get: jest.fin (() => )
export default apiClient;