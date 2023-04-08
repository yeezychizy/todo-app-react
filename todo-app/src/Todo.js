import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import './Todo.css';

function Todo() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (inputValue !== '') {
      const newTask = {
        id: Date.now(),
        title: inputValue,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleCheckboxChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRemoveButtonClick = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="font-weight-bold">Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task"
                value={inputValue}
                onChange={handleInputChange}
                className="input-field"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btn-add">
              Add
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3 className="font-weight-bold">Tasks</h3>
          <ListGroup className="tasks-list">
            {tasks.map((task) => (
              <ListGroup.Item key={task.id} className="task-item">
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  label={task.title}
                  onChange={() => handleCheckboxChange(task.id)}
                  className="checkbox"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveButtonClick(task.id)}
                  className="btn-remove"
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;
