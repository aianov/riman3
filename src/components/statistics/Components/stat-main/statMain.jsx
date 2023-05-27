import React, { useState } from 'react'
import './statMain.scss'

import { Graph } from '../area-chart/areaChart'
import { TbSquareRoundedPlusFilled } from 'react-icons/tb'
import { BiSearch } from 'react-icons/bi'
import { Slider } from './components/slider'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';

import useDebounce from '../../../../hooks/useDebounce'

export const StatMain = () => {
    const [variant, setVariant] = useState(true)
    const [theme, setTheme] = useState(false)
    const [task, setTask] = useState(false)

    const [variantMid, setVariantMid] = useState(true)
    const [themeMid, setThemeMid] = useState(false)
    const [itemLoad, setItemLoad] = useState(false)
    const [itemError, setItemError] = useState(false)

    const [search, setSearch] = useState('')

    const debouncedSearch = useDebounce(midSearch, 500)

    const bottomBtns = (btn) => {
        setVariant(false)
        setTheme(false)
        setTask(false)
        if (btn === 1) { setVariant(true) }
        if (btn === 2) { setTheme(true) }
        if (btn === 3) { setTask(true) }
    }

    const monthNames = [
        "январь",
        "февраль",
        "март",
        "апрель",
        "май",
        "июнь",
        "июль",
        "август",
        "сентябрь",
        "октябрь",
        "ноябрь",
        "декабрь"
    ];

    // Получаем текущую дату и месяц (от 0 до 11)
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();

    // Получаем прошлый месяц (если текущий месяц январь, то прошлый месяц будет декабрь прошлого года)
    const lastMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;

    // Получаем названия текущего и прошлого месяца
    const currentMonthName = monthNames[currentMonthIndex];
    const lastMonthName = monthNames[lastMonthIndex];

    const daysOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

    const midBtns = (btn) => {
        setVariantMid(false)
        setThemeMid(false)
        if (btn === 1) { setVariantMid(true) } else { setThemeMid(true) }
    }

    const items = [
        {
            item: "Геометрия",
            tasks: "720",
            proc: "64",
            time: "6ч 30м"
        },
        {
            item: "Планиметрия",
            tasks: "600",
            proc: "62",
            time: "4ч 20м"
        },
        {
            item: "Алгебра",
            tasks: null,
            proc: null,
            time: null,
        },
        {
            item: "Геометрия",
            tasks: null,
            proc: null,
            time: null,
        },
        {
            item: "Алгебра",
            tasks: null,
            proc: null,
            time: null,
        },
    ]
    const [midItems, setMidItems] = useState([...items]);

    function midSearch(e) {
        const str = e.toLowerCase()
        const itemArr = items;
        for (let i = 0; i < itemArr.length; i++) {
            itemArr[i].item = itemArr[i].item.toLowerCase()
        }
        const res = itemArr.filter(item => item.item.indexOf(str) === 0);
        if (res.length >= 1) {
            const itemsArray = res;
            for (let i = 0; i < res.length; i++) {
                itemsArray[i].item = res[i].item.charAt(0).toUpperCase() + res[i].item.slice(1);
            }
            setMidItems(itemsArray)
            setItemLoad(false)
        } else {
            setMidItems([])
            setItemLoad(false)
            setItemError(true)
        }
    }

    const midOnChange = (e) => {
        if (!/^[а-яА-Я]*$/.test(e)) { return; }
        setItemError(false)
        setItemLoad(true)
        setSearch(e)
        debouncedSearch(e)
    }

    return (
        <div className="stat__bottom" style={{ color: "white" }}>
            <div className="stat__bottom-top">
                <div className="stat__bottom-top__title">
                    <p>Графики</p>
                    <div className="stat__bottom-top__graph">
                        <div className="stat__bottom-top__graph-btns">
                            <button
                                disabled={variant}
                                onClick={() => bottomBtns(1)}
                                style={variant ? { backgroundColor: 'rgba(217, 217, 217, 0.1)' } : { backgroundColor: 'rgba(217, 217, 217, 0)' }}>
                                варианты
                            </button>
                            <button
                                disabled={theme}
                                onClick={() => bottomBtns(2)}
                                style={theme ? { backgroundColor: 'rgba(217, 217, 217, 0.1)' } : { backgroundColor: 'rgba(217, 217, 217, 0)' }}>
                                темы
                            </button>
                            <button
                                disabled={task}
                                onClick={() => bottomBtns(3)}
                                style={task ? { backgroundColor: 'rgba(217, 217, 217, 0.1)' } : { backgroundColor: 'rgba(217, 217, 217, 0)' }}>
                                задачи
                            </button>
                        </div>
                        <div className="stat__bottom-top__graph-graph">
                            <Graph />
                        </div>
                    </div>
                </div>

                {/* АКТИВНОСТЬ */}
                <div className="stat__bottom-top__activity">
                    <div className="stat__bottom-top__activity-bar">
                        <p>Активность</p>
                        <Link to="/tasks/statistics/activity" className="stat__bottom-top__activity-bar__more">
                            <TbSquareRoundedPlusFilled size={17.5} />
                            <p>Больше информации</p>
                        </Link>
                    </div>
                    <div className="stat__bottom-top__activity-main">
                        <div className="stat__bottom-top__activity-main__title">
                            <p>{lastMonthName}</p>
                            <p>{currentMonthName}</p>
                        </div>
                        <table>
                            <tbody>
                                {daysOfWeek.map((day) => (
                                    <tr key={day}>
                                        <td className="dayOfWeek">{day}</td>
                                        {[...Array(12)].map((_, index) => (
                                            <td key={index} className="cell" />
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="stat__bottom-middle">
                {/* СТАТИСТИКА */}
                <div className="stat__bottom-middle__stat">
                    <div className="stat__bottom-middle__stat-bar">
                        <div className="stat__bottom-middle__stat-bar__btns">
                            <Link onClick={() => midBtns(1)} to={variantMid ? null : '/tasks/statistics/variants'} style={variantMid ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'rgb(0, 0, 0, 0)' }}>
                                Варианты
                            </Link>
                            <Link onClick={() => midBtns(2)} to={themeMid ? null : '/tasks/statistics/themes'} style={themeMid ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'rgb(0, 0, 0, 0)' }}>
                                        Темы
                            </Link>
                        </div>
                        <Link to="/tasks/statistics/themes" className="stat__bottom-middle__stat-bar__more">
                            <TbSquareRoundedPlusFilled size={17.5} />
                            <p>Больше информации</p>
                        </Link>
                    </div>
                    <div className="stat__bottom-middle__stat-main">
                        <div className="stat__bottom-middle__stat-main__bar">
                            <div className="stat__bottom-middle__stat-main__bar-search">
                                <div className="stat__bottom-middle__stat-main__bar-search-div" style={{backgroundColor: '#22222244'}}>
                                    <input maxLength={10} onChange={e => midOnChange(e.target.value)} value={search} type="text" placeholder='поиск'/>
                                    <BiSearch />
                                </div>
                            </div>
                            <div className="stat__bottom-middle__stat-main__bar-crit">
                                <p>кол-во<br />задач</p>
                                <p>процент<br />верных</p>
                                <p>время</p>
                            </div>
                        </div>
                        {itemLoad ? (
                            <div className='stat-bottom-itemload'>
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </div>
                        ) : (
                            <div className="stat__bottom-middle__stat-main__main">
                                {midItems.map((arr, ind) => (
                                    <div className="stat__bottom-middle__stat-main__main-item" key={ind}>
                                        <p className='stat__bottom-middle__stat-main__main-item-item'>{arr.item ? arr.item : ''}</p>
                                        <p className='stat__bottom-middle__stat-main__main-item1'>{arr.tasks ? arr.tasks : ''}</p>
                                        <p className='stat__bottom-middle__stat-main__main-item2'>{arr.proc ? arr.proc : ''}</p>
                                        <p className='stat__bottom-middle__stat-main__main-item3'>{arr.time ? arr.time : ''}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {itemError ? (
                            <div className="mid-item-loaderror df jcc aic">
                                <h1>Ничего не найдено :(</h1>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* МАТ БОИ */}
                <div className="stat__bottom-middle__math">
                    <div className="stat__bottom-middle__math-bar">
                        <p>Мат бои</p>
                        <Link to="/tasks/statistics/themes" className="stat__bottom-middle__math-bar__more">
                            <TbSquareRoundedPlusFilled size={17.5} />
                            <p>Больше информации</p>
                        </Link>
                    </div>
                    <div className="stat__bottom-middle__math-main">
                        <div className="stat__bottom-middle__stat-main__bar">
                            <div className="stat__bottom-middle__stat-main__bar-search">
                                {/* asd */}
                            </div>
                            <div className="stat__bottom-middle__stat-main__bar-crit">
                                <p>кол-во<br />задач</p>
                                <p>процент<br />верных</p>
                                <p>время</p>
                            </div>
                        </div>
                        <div className="stat__bottom-middle__math-main__main">
                            <div className="stat__bottom-middle__math-main__main-item">
                                <p className='stat__bottom-middle__math-main__main-item-item'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item1'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item2'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item3'>a</p>
                            </div>
                            <div className="stat__bottom-middle__math-main__main-item">
                                <p className='stat__bottom-middle__math-main__main-item-item'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item1'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item2'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item3'>a</p>
                            </div>
                            <div className="stat__bottom-middle__math-main__main-item">
                                <p className='stat__bottom-middle__math-main__main-item-item'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item1'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item2'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item3'>a</p>
                            </div>
                            <div className="stat__bottom-middle__math-main__main-item">
                                <p className='stat__bottom-middle__math-main__main-item-item'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item1'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item2'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item3'>a</p>
                            </div>
                            <div className="stat__bottom-middle__math-main__main-item">
                                <p className='stat__bottom-middle__math-main__main-item-item'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item1'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item2'>a</p>
                                <p className='stat__bottom-middle__math-main__main-item3'>a</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="stat__bottom-bottom">
                <div className="stat__bottom-bottom__achiv">
                    <div className="stat__bottom-bottom__achiv-bar">
                        <p>Достижения</p>
                        <Link to="/tasks/statistics/achievements" className="stat__bottom-bottom__achiv-bar__more">
                            <TbSquareRoundedPlusFilled size={17.5} />
                            <p>Больше информации</p>
                        </Link>
                    </div>
                    <Slider />
                </div>
            </div>
        </div>
    )
}
