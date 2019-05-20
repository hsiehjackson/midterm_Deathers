import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../helpers';

class Todo extends Component {
  static propTypes = {
    todoObj: PropTypes.shape({
      id: PropTypes.string,
      done: PropTypes.bool,
      name: PropTypes.string,
    }),
  };

  static defaultProps = {
    todoObj: {
      id: -1,
      done: false,
      name: 'DEFAULT THING TO DO',
    },
    isInputActive: false,
  };

  render() {
    const { todoObj, isInputActive } = this.props;
    const { done, name } = todoObj;

    return (
      <div className={classNames('todo')}>
        <input
          className="todo__name"
          value={name}
          alt={name}
          autoFocus={isInputActive}
          disabled={!isInputActive}
          onChange={this.onTodoInput}
          type="text"
          name="name"
          placeholder="What to do?"
          autoComplete="off"
          style={{
            textDecoration: done ? "line-through":"",
            opacity: done ? 0.5:1}}
        />
      </div>
    );
  }
}

export default Todo;
