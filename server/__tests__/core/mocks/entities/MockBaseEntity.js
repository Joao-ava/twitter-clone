import { randomUUID } from 'crypto';

class MockBaseEntity {
  constructor(params = {}) {
    this.id = params.id || randomUUID();
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }
}

export default MockBaseEntity;
