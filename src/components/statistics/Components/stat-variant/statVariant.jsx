import React, { useState, useEffect } from 'react'
import variants from './statVariant.module.scss'

// components
import { TasksList } from './components/tasks-list/tasksList'

// icons
import { BiExport, BiMinus, BiPlus } from 'react-icons/bi'
import { HiOutlinePrinter } from 'react-icons/hi'

// librarys
import axios from 'axios'
import { Pagination } from '@mui/material';

export const StatVariant = () => {
    const [tasks, setTasks] = useState([]);
    const [maxtasks, setMaxtasks] = useState(parseInt(localStorage.getItem("maxTasks") || 2));
    const [tasksPerPage, setTasksPerPage] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true);

    const [hideanswer, setHideanswer] = useState(true);
    const [visibletext, setVisibletext] = useState(false);

    const hideHandler = () => {
        setHideanswer(!hideanswer)
    }

    const updTest = () => { setTasksPerPage(parseInt(localStorage.getItem("maxTasks" || 2))) }

    useEffect(() => {
        const getTasks = async () => {
            const maxValue = localStorage.getItem("maxTasks" || 2);
            if (maxValue === null) {
                localStorage.setItem("maxTasks", 2);
            }
            const res = await axios.get('http://178.21.8.81/api/tasks/');
            for (let a = 0; a < res.data.length; a++) {
                res.data[a].time = {
                    'hours': 1,
                    'minutes': 12,
                };
                res.data[a].grade = 10;
                res.data[a].attemp = 2;
                res.data[a].difficulty = 16;
                res.data[a].answer = 'Чтобы решить эту задачу вам нужно было положить кубик А на кубик Б, о боже какая разница'
                res.data[a].text = a + 1;
            }
            const updatedTasks = await Promise.all(res.data.map(async (task) => {
                const editedImage = new Image();
                editedImage.crossOrigin = 'anonymous';
                if (task.image) {
                    editedImage.src = task.image;
                } else {
                    task.image = "http://178.21.8.81/media/tasks_images/9a989fec-174c-4f61-8673-ed563b65c528/Screenshot_9.png";
                    task.error = true;
                    editedImage.src = task.image;
                }
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const loadImage = new Promise((resolve, reject) => {
                    editedImage.onload = () => {
                        canvas.width = editedImage.width;
                        canvas.height = editedImage.height;
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(editedImage, 0, 0, canvas.width, canvas.height);
                        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const data = imgData.data;
                        for (let j = 0; j < data.length; j += 4) {
                            const r = data[j];
                            const g = data[j + 1];
                            const b = data[j + 2];
                            const brightness = (3 * r + 4 * g + b) >>> 3;
                            if (brightness < 128) {
                                data[j] = 220; // белый цвет
                                data[j + 1] = 220;
                                data[j + 2] = 220;
                                data[j + 3] = 255;
                            } else {
                                data[j + 3] = 0; // прозрачный цвет
                            }
                        }
                        ctx.putImageData(imgData, 0, 0);
                        task.image = canvas.toDataURL();
                        resolve(task);
                    };
                    editedImage.onerror = () => {
                        reject(new Error('Failed to load image.'));
                    };
                });
                return loadImage;
            }));
            setTasks(updatedTasks);
        };
        getTasks();
    }, []);
    const lastTasksIndex = currentPage * tasksPerPage
    const firstTasksIndex = lastTasksIndex - tasksPerPage
    const currentTasks = tasks.slice(firstTasksIndex, lastTasksIndex);

    const paginate = pageNumbers => {
        setCurrentPage(pageNumbers || 1);
        loadingHandle()
    };

    const loadingHandle = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }

    const minusHandler = () => {
        if (maxtasks <= 1) { return; }
        setMaxtasks(maxtasks => maxtasks - 1)
        localStorage.setItem("maxTasks", maxtasks - 1);
        window.dispatchEvent(new Event('storageUpdated'))
        loadingHandle()
    }
    const plusHandler = () => {
        if (maxtasks >= 40) { return; }
        setMaxtasks(maxtasks => maxtasks + 1)
        localStorage.setItem("maxTasks", maxtasks + 1);
        window.dispatchEvent(new Event('storageUpdated'))
        loadingHandle()
    }

    const hideNav = () => {
        setVisibletext(!visibletext)
    }

    useEffect(() => {
        updTest()
    }, []);

    return (
        <div className={variants.main}>
            <div className={`${variants.nav} w100`}>
                <div className={`${variants['nav-title']} df jcsb aife w100`}>
                    <p className={variants['nav-title-text']}>Результат:</p>
                    <div className={`${variants.btnhide} cp`} onClick={() => hideNav()}>
                        <p>{visibletext ? 'показать' : 'скрыть'}</p>
                    </div>
                </div>
                {visibletext ? <></> :
                    <>
                        <div className={`${variants['nav-tags']} df fww w100`}>
                            <div className={variants['nav-tags-item']}>
                                <p>Всего задач:</p>
                            </div>
                            <div className={variants['nav-tags-item']}>
                                <p>Всего задач:</p>
                            </div>
                            <div className={variants['nav-tags-item']}>
                                <p>Всего задач:</p>
                            </div>
                        </div>
                        <div className={`${variants['nav-btns']} df fww w100`}>
                            <div className={`${variants.navbtn} df jcsb aic cp`}>
                                <p>Печать</p>
                                <HiOutlinePrinter size={20} />
                            </div>
                            <div className={`${variants.navbtn} df jcsb aic cp`}>
                                <p>Экспорт в PDF</p>
                                <BiExport size={20} />
                            </div>
                            <div className={`${variants.navbtn} df jcsb aic cp`}>
                                <p>Задач на странице</p>
                                <div className={`${variants['navbtn-tasksnum']} df jcsb aic`}>
                                    <BiMinus size={20} onClick={() => minusHandler()} />
                                    <span className={variants.tasksnum}>{maxtasks}</span>
                                    <BiPlus size={20} onClick={() => plusHandler()} />
                                </div>
                            </div>
                            <div className={`${variants.navbtn} df jcsb aic cp`}>
                                <p>Показать решения</p>
                                <div className={`${variants['navbtn-answerview']} df jcsb aic`}>
                                    <button
                                        className='cw df aic jcc'
                                        disabled={hideanswer}
                                        onClick={() => hideHandler()}
                                        style={hideanswer ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'rgba(0, 0, 0, 0)' }}>
                                        Нет
                                    </button>
                                    <button
                                        className='cw df aic jcc'
                                        disabled={!hideanswer}
                                        onClick={() => hideHandler()}
                                        style={!hideanswer ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'rgba(0, 0, 0, 0)' }}>
                                        Да
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>}
            </div>
            <div className={`${variants.bottom} w100`}>
                <div className={`${variants['bottom-pagination']} w100 df jcc aic`}>
                    <Pagination
                        count={Math.ceil(tasks.length / tasksPerPage)}
                        onChange={(_, num) => paginate(num)}
                    />
                </div>
                <div className={`${variants['bottom-taskitem']} w100`}>
                    {currentTasks.map((arr, ind) => <TasksList pagitasks={arr} loading={loading} testik={!hideanswer} key={ind} />)}
                </div>
            </div>
        </div>
    )
}