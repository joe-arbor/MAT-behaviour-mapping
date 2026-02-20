import { Attachment } from '../../components/attachment/Attachment';
import './attachmentShowcase.scss';

export function AttachmentShowcase() {
  return (
    <div className="attachment-showcase">
      <section className="attachment-showcase__section">
        <h2 className="attachment-showcase__heading">Attachments</h2>
        <p className="attachment-showcase__intro">
          Drag or click to upload files. Each attachment can be downloaded or deleted when enabled. Upload can be disabled for read-only lists.
        </p>

        <div className="attachment-showcase__block">
          <Attachment
            title="Attachments - all enabled"
            allowUpload
            allowDelete
            allowDownload
            collapsible
          />
        </div>

        <div className="attachment-showcase__block">
          <Attachment
            title="Attachments - delete disabled"
            allowUpload
            allowDelete={false}
            allowDownload
            collapsible
          />
        </div>

        <div className="attachment-showcase__block">
          <Attachment
            title="Attachments - upload disabled"
            allowUpload={false}
            allowDelete
            allowDownload
            collapsible
          />
        </div>
      </section>
    </div>
  );
}
