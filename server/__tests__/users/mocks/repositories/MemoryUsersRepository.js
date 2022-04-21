import MockUser from '../entities/MockUser';

class MemoryUsersRepositiry {
  constructor() {
    this.items = []
  }

  async findById(id) {
    return this.items.find((item) => item.id === id);
  }

  async findByEmail(email) {
    return this.items.find((item) => item.email === email);
  }

  async create(data) {
    const user = new MockUser(data);
    this.items.push(user);
    return user;
  }
}

export default MemoryUsersRepositiry;
