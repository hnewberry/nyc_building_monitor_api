import json
import test_context
import setup_tests
import factories
  
def seed_db():
  setup_tests.setup_db()
  factories.seed_test_db_with_buildings_violations_calls()

def test_insertions():
  c = setup_tests.new_cursor()

  try:
    c = setup_tests.new_cursor()
    seed_db()
    update_data(c)
    setup_tests.drop_db()

  except Exception as error:
    print(error)
    setup_tests.drop_db()
    raise error


def update_data(c):
  test_context.context.buildings_migration.update_data(c)

  try:     
    c.execute('SELECT total_violations FROM {tn}'.format(tn='buildings'))
    entry = c.fetchone()
    assert entry[0] == 3

    c.execute('SELECT total_service_calls FROM {tn}'.format(tn='buildings'))
    entry = c.fetchone()
    assert entry[0] == 3

    c.execute('SELECT total_service_calls_open_over_month FROM {tn}'.format(tn='buildings'))
    entry = c.fetchone()
    assert entry[0] == 1

    c.execute('SELECT service_calls_average_days_to_resolve FROM {tn}'.format(tn='buildings'))
    entry = c.fetchone()
    assert entry[0] == 35.5

    c.execute('SELECT total_sales FROM {tn}'.format(tn='buildings'))
    entry = c.fetchone()
    assert entry[0] == None


  except AssertionError as error:
    raise error


