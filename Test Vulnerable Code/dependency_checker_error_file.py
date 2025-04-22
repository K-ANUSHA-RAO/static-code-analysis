# This script uses outdated and vulnerable packages as defined by the DependencyChecker

import some_old_package  # This is flagged as outdated
import vulnerable_package  # This is flagged as vulnerable

def process_data():
    data = some_old_package.get_data()
    result = vulnerable_package.analyze(data)
    return result

output = process_data()
print(output)

