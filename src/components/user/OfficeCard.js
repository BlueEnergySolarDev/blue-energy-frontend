
export const OfficeCard = ({ office }) => {
  return (
    <div className='col m-1 d-flex flex-column justify-content-center align-items-center rounded-3 degrade-ld-back text-light p-2'>
      <h2 className='mb-2'>{office.name}</h2>
      <hr />
      <h2 className='mb-2'>Sit downs</h2>
      <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{office.sit_down}</span>
      <h2 className='mb-2'>Fail credits</h2>
      <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{office.fail_credit}</span>
    </div>
  );
};
