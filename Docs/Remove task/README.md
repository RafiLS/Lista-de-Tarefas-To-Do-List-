# Delete Task

## Analysis

### Functional Requirements
- The user must be able to delete an existing task from the list.
- The task is permanently removed based on its ID.

### Use Cases
- **Main Scenario**: The user selects a task and confirms deletion. The task is removed from the list.
- **Alternative Scenario**: If the task does not exist, display an error.

### Validations
- Task ID: Must be valid and exist in the list.

## Design

### Data Model
```
interface Task {
  id: number;
  title: string;
  completed: boolean;
}
```

### REST Request Type
- **Method:** DELETE
- **Endpoint:** /tasks/:id
- **Type:** Implementation
- **Description:** Remove a task