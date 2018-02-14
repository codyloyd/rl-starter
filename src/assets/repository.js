import ROT from "rot-js";

class Repository {
  constructor({ name = "repository", ctor = null }) {
    this.templates = {};
    this.randomTemplates = {};
    this.ctor = ctor;
  }

  define(template) {
    this.templates[template.name] = template;
    if (!template.disableRandomCreation) {
      this.randomTemplates[template.name] = template;
    }
  }

  create(name) {
    const template = this.templates[name];
    if (!template) {
      throw new Error(`no template named ${name}`);
    }
    if (template) {
      return new this.ctor(template);
    }
  }

  createRandom() {
    const weightMap = Object.keys(
      this.randomTemplates
    ).reduce((obj, template) => {
      const item = this.randomTemplates[template];
      obj[template] = item.rngWeight || 1;
      return obj;
    }, {});
    const item = ROT.RNG.getWeightedValue(weightMap);
    return this.create(item);
  }
}

export default Repository;
