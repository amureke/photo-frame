import { useState, useEffect, useCallback } from "react";

function FrameChooser({ onChange }) {
  const [frames, setFrames] = useState([]);
  const [choosenFrame, setChoosenFrame] = useState(null);

  const choosenFrameSRC = !!choosenFrame ? choosenFrame.src : null;

  useEffect(() => {
    async function loadFrames() {
      Promise.all(
        [
          "4xSOM-Blue-Red-Yellow-Green",
          "5xSOM-Pride",
          "Stars",
          "5xSOM-Blue",
          "5xSOM-Green",
          "5xSOM-Red",
          "5xSOM-Yellow",
          "frm_1",
        ].map(async (frame_filename) => {
          return {
            name: frame_filename,
            src: (await import(`./frames/${frame_filename}.png`)).default,
          };
        })
      ).then((new_frames) => {
        setFrames(new_frames);
        setChoosenFrame(new_frames[0]);
      });
    }
    loadFrames();
  }, []);

  const handleImageChoosing = useCallback(
    (frame) => {
      setChoosenFrame(frame);
    },
    [setChoosenFrame]
  );

  useEffect(() => {
    onChange(choosenFrame);
  }, [onChange, choosenFrame]);

  return (
    <div className="FrameChooser">
      {frames.map((frame) => {
        const frame_src_path = frame.src;
        const isChoosen = choosenFrameSRC === frame_src_path;
        return (
          <div
            key={frame_src_path}
            data-src={frame_src_path}
            className={isChoosen ? "frame choosen" : "frame"}
            onClick={() => handleImageChoosing(frame)}
          >
            <img alt={frame.name} src={frame_src_path} />
          </div>
        );
      })}
    </div>
  );
}

export default FrameChooser;
