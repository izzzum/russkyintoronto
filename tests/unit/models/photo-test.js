import { moduleForModel, test } from 'ember-qunit';

moduleForModel('photo', 'Unit | Model | photo', {
  // Specify the other units that are required for this test.
  needs: ['model:item']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
