import { moduleForModel, test } from 'ember-qunit';

moduleForModel('attachment', 'Unit | Model | attachment', {
  // Specify the other units that are required for this test.
  needs: ['model:item', 'model:photo', 'model:posted-photo', 'model:video', 'model:audio', 'model:doc', 'model:graffiti', 'model:link', 'model:note', 'model:app', 'model:poll', 'model:page']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
