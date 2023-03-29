import React, { useState } from "react";
import cl from "./Task.module.scss";
import Checkbox from "../UI/Checkbox/Checkbox";
import Modal from "../Modal/Modal";
import { FaTrashAlt } from "react-icons/fa";
import { TfiMoreAlt } from "react-icons/tfi";
import { AiOutlineEdit } from "react-icons/ai";

export default function Task({
  title,
  description,
  priority,
  dueDate,
  assignedProject,
  setEditingTask,
  deleteTask,
  task,
  setType,
  setIsFormActive,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = () => {
    setEditingTask(task);
    setType("edit");
    setIsFormActive(true);
  };

  return (
    <div className={cl.task}>
      <div className={cl.taskContent}>
        <div className={cl.taskLeft}>
          <Checkbox priority={priority} />
          <div className={cl.taskText}>
            <div className={cl.taskTitle}>{title}</div>
            <div className={cl.taskDescription}>{description}</div>
          </div>
        </div>
        <div className={cl.taskTools}>
          <div className={cl.editContainer}>
            <button className={cl.editButton} onClick={handleEdit}>
              <AiOutlineEdit className={cl.editIcon} />
            </button>
          </div>
          <div className={cl.moreContainer}>
            <button
              className={cl.moreButton}
              onClick={() => setModalVisible(!modalVisible)}
            >
              <TfiMoreAlt className={cl.moreIcon} />
            </button>
            <Modal visible={modalVisible} setVisible={setModalVisible}>
              <button
                className={cl.trashButton}
                onClick={() => {
                  deleteTask(task);
                }}
              >
                <FaTrashAlt className={cl.trashIcon} />
                Delete task
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
