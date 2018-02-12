import Glyph from "./glyph";

class DynamicGlyph extends Glyph {
  constructor({ name = "", mixins = [] }) {
    super(...arguments);
    this.name = name;
    this.attachedMixins = {};
    this.attachedMixinGroups = {};

    mixins.forEach(mixinFactory => {
      const mixin = new mixinFactory(...arguments);

      this.attachedMixins[mixin.name] = true;
      delete mixin.name;
      if (mixin.groupName) {
        this.attachedMixinGroups[mixin.groupName] = true;
        delete mixin.groupName;
      }
      Object.assign(this, mixin);
    });
  }

  hasMixin(mixin) {
    return (
      this.attachedMixins.hasOwnProperty(mixin) ||
      this.attachedMixinGroups.hasOwnProperty(mixin)
    );
  }

  describe() {
    return this.name;
  }

  describeA(capitalize) {
    const prefixes = capitalize ? [`A`, `An`] : [`a`, `an`];
    const prefix =
      "aeiou".indexOf(this.describe()[0].toLowerCase()) >= 0 ? 1 : 0;
    return prefixes[prefix] + " " + this.describe();
  }

  describeThe(capitalize) {
    const prefix = capitalize ? `The` : `the`;
    return prefix + " " + this.describe();
  }
}

export default DynamicGlyph;
