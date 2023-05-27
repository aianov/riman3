import React, { useState } from 'react'
import themes from './statTheme.module.scss'

import { Link } from 'react-router-dom';
import { AiFillMinusSquare } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

import Skeleton from 'react-loading-skeleton';
import useDebounce from '../../../../hooks/useDebounce';

export const StatTheme = () => {

    const [variants, setVariants] = useState(false);
    const [theme, setTheme] = useState(true);

    // for left and right state value inputs
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');
    const [leftload, setLeftload] = useState(false);
    const [rightload, setRightload] = useState(false);
    const [lefterror, setLefterror] = useState(false);
    const [righterror, setRighterror] = useState(false);

    // debounce for left and right inputs
    const debouncedleft = useDebounce(leftSearch, 500);
    const debouncedright = useDebounce(rightSearch, 500);

    const variantsBtn = () => {
        setVariants(true)
        setTheme(false)
    }
    const themesBtn = () => {
        setTheme(true)
        setVariants(false)
    }

    const virtualApi = [
        { item: "Геометрия", tasks: "720", proc: "64", time: "6ч 30м" },
        { item: "Планиметрия", tasks: "600", proc: "62", time: "4ч 20м" },
        { item: "Алгебра", tasks: null, proc: null, time: null },
        { item: "Геометрия", tasks: "720", proc: "64", time: "6ч 30м" },
        { item: "Планиметрия", tasks: "600", proc: "62", time: "4ч 20м" },
        { item: "Алгебра", tasks: null, proc: null, time: null },
        { item: "Геометрия", tasks: "720", proc: "64", time: "6ч 30м" },
        { item: "Планиметрия", tasks: "600", proc: "62", time: "4ч 20м" },
        { item: "Алгебра", tasks: null, proc: null, time: null },
        { item: "Геометрия", tasks: "720", proc: "64", time: "6ч 30м" },
        { item: "Планиметрия", tasks: "600", proc: "62", time: "4ч 20м" },
        { item: "Алгебра", tasks: null, proc: null, time: null },
        { item: "Геометрия", tasks: "720", proc: "64", time: "6ч 30м" },
        { item: "Планиметрия", tasks: "600", proc: "62", time: "4ч 20м" },
        { item: "Алгебра", tasks: null, proc: null, time: null },
        { item: "Геометрия", tasks: "720", proc: "64", time: "6ч 30м" },
        { item: "Планиметрия", tasks: "600", proc: "62", time: "4ч 20м" },
        { item: "Алгебра", tasks: null, proc: null, time: null },
        { item: "Геометрия", tasks: "720", proc: "64", time: "6ч 30м" },
        { item: "Планиметрия", tasks: "600", proc: "62", time: "4ч 20м" },
        { item: "Алгебра", tasks: null, proc: null, time: null },
    ]
    const [items, setItems] = useState([...virtualApi]);
    const [itemsright, setItemsRight] = useState([...virtualApi]);

    // ===================== inputs for search =====================
    function leftSearch(e) {
        const str = e.toLowerCase()
        const leftarr = virtualApi;
        for (let i = 0; i < leftarr.length; i++) { leftarr[i].item = leftarr[i].item.toLowerCase() }
        const res = leftarr.filter(item => item.item.indexOf(str) === 0);
        if (res.length >= 1) {
            const itemsArray = res;
            for (let i = 0; i < res.length; i++) { itemsArray[i].item = res[i].item.charAt(0).toUpperCase() + res[i].item.slice(1); }
            setItems(itemsArray)
            setLeftload(false)
        } else {
            setItems([])
            setLeftload(false)
            setLefterror(true)
        }
    }

    const leftOnChange = (e) => {
        if (!/^[а-яА-Я]*$/.test(e)) { return; }
        setLefterror(false);
        setLeftload(true);
        setLeft(e);
        debouncedleft(e);
    }

    function rightSearch(e) {
        const str = e.toLowerCase()
        const rightarr = virtualApi;
        for (let i = 0; i < rightarr.length; i++) { rightarr[i].item = rightarr[i].item.toLowerCase() }
        const res = rightarr.filter(item => item.item.indexOf(str) === 0);
        if (res.length >= 1) {
            const itemsArray = res;
            for (let i = 0; i < res.length; i++) { itemsArray[i].item = res[i].item.charAt(0).toUpperCase() + res[i].item.slice(1); }
            setItemsRight(itemsArray)
            setRightload(false)
        } else {
            setItemsRight([])
            setRightload(false)
            setRighterror(true)
        }
    }
    const rightOnChange = (e) => {
        if (!/^[а-яА-Я]*$/.test(e)) { return; }
        setRighterror(false);
        setRightload(true);
        setRight(e);
        debouncedright(e);
    }

    return (
        <div className={themes.main}>
            <div className={`${themes.nav} df jcfe w100`}>
                <Link to='/tasks/statistics' className={`${themes['nav-exit']} cp cw tdn df aic`}>
                    <AiFillMinusSquare size={20} />
                    <span>скрыть</span>
                </Link>
            </div>
            <div className='df w100 fww jcc'>
                {/* ====================== LEFT ====================== */}
                <div className={`${themes.left}`}>
                    <div className={`${themes['left-nav']} w100`}>
                        <div className={`${themes['left-nav-btns']} df jcsb`}>
                            <Link
                                to='/tasks/statistics'
                                onClick={() => variantsBtn()}
                                style={variants ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'rgba(0, 0, 0, 0)' }}
                                className='cw tdn w100 tac'>
                                Варианты
                            </Link>
                            <Link
                                onClick={() => themesBtn()}
                                style={theme ? { backgroundColor: 'white', color: 'black' } : { backgroundColor: 'rgba(0, 0, 0, 0)' }}
                                className='cw tdn w100 tac'>
                                Темы
                            </Link>
                        </div>
                    </div>
                    <div className={`${themes.content} w100`}>
                        <div className={`${themes['left-content-nav']} df aic`}>
                            <div className={`${themes['left-content-nav-left']} w50`}>
                                <div className={`${themes.inputdiv} df aic jcsb`}>
                                    <input
                                        type="text"
                                        onChange={e => leftOnChange(e.target.value)}
                                        className='cw'
                                        value={left}
                                        maxLength={15}
                                        placeholder='поиск' />
                                    <BiSearch size={20} style={{ marginRight: '5px' }} />
                                </div>
                            </div>
                            <div className={`${themes['left-content-nav-right']} w50 df jcse`}>
                                <p>кол-во<br />задач</p>
                                <p>процент<br />верных</p>
                                <p>время</p>
                            </div>
                        </div>
                        <div className={`${themes.contentcontainer} w100`}>
                            {leftload ?
                                <div className={`${themes.leftload} w100 h100`}>
                                    {[...Array(items.length)].map((_, index) => (
                                        <Skeleton style={{ height: '25px', marginTop: '3px' }} className='w100' key={index} />
                                    ))}
                                </div>
                                :
                                <div className={`${themes['left-content-list']} w100`}>
                                    {items.map((arr, ind) => (
                                        <div className={`${themes['content-item']} df aic w100`} key={ind}>
                                            <p className={`${themes.itemname} df aic br1w w50`}>{arr.item ? arr.item : '-'}</p>
                                            <p className={`${themes.tasks} df aic jcc br1w`}>{arr.tasks ? arr.tasks : '-'}</p>
                                            <p className={`${themes.proc} df aic jcc br1w`}>{arr.proc ? arr.proc : '-'}</p>
                                            <p className={`${themes.time} df aic jcc`}>{arr.time ? arr.time : '-'}</p>
                                        </div>
                                    ))}
                                </div>
                            }
                            {lefterror ? (
                                <div className="w100 h100 df jcc aic">
                                    <h1>Ничего не найдено :(</h1>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
                {/* ====================== RIGHT ====================== */}
                <div className={`${themes.right}`}>
                    <div className={`${themes['right-nav']} w100`}>
                        <p>Мат бои</p>
                    </div>
                    <div className={`${themes.content} w100`}>
                        <div className={`${themes['left-content-nav']} df aic`}>
                            <div className={`${themes['left-content-nav-left']} w50`}>
                                <div className={`${themes.inputdiv} df aic jcsb`}>
                                    <input
                                        type="text"
                                        onChange={e => rightOnChange(e.target.value)}
                                        className='cw'
                                        value={right}
                                        maxLength={15}
                                        placeholder='поиск' />
                                    <BiSearch size={20} style={{ marginRight: '5px' }} />
                                </div>
                            </div>
                            <div className={`${themes['left-content-nav-right']} w50 df jcse`}>
                                <p>кол-во<br />задач</p>
                                <p>процент<br />верных</p>
                                <p>время</p>
                            </div>
                        </div>
                        <div className={`${themes.contentcontainer} w100`}>
                            {rightload ?
                                <div className={`${themes.leftload} w100 h100`}>
                                    {[...Array(itemsright.length)].map((_, index) => (
                                        <Skeleton style={{ height: '25px', marginTop: '3px' }} className='w100' key={index} />
                                    ))}
                                </div>
                                :
                                <div className={`${themes['left-content-list']} w100`}>
                                    {itemsright.map((arr, ind) => (
                                        <div className={`${themes['content-item']} df aic w100`} key={ind}>
                                            <p className={`${themes.itemname} df aic br1w w50`}>{arr.item ? arr.item : '-'}</p>
                                            <p className={`${themes.tasks} df aic jcc br1w`}>{arr.tasks ? arr.tasks : '-'}</p>
                                            <p className={`${themes.proc} df aic jcc br1w`}>{arr.proc ? arr.proc : '-'}</p>
                                            <p className={`${themes.time} df aic jcc`}>{arr.time ? arr.time : '-'}</p>
                                        </div>
                                    ))}
                                </div>
                            }
                            {righterror ? (
                                <div className="w100 h100 df jcc aic">
                                    <h1>Ничего не найдено :(</h1>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
